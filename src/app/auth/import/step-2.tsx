import { useState } from 'react';
import { Resolver, useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';

import { EyeOffIcon, EyeOnIcon, LoaderIcon } from '@shared/icons';

import { useOnboarding } from '@stores/onboarding';
import { useStronghold } from '@stores/stronghold';

import { useSecureStorage } from '@utils/hooks/useSecureStorage';

type FormValues = {
  password: string;
};

const resolver: Resolver<FormValues> = async (values) => {
  return {
    values: values.password ? values : {},
    errors: !values.password
      ? {
          password: {
            type: 'required',
            message: 'This is required.',
          },
        }
      : {},
  };
};

export function ImportStep2Screen() {
  const navigate = useNavigate();

  const [passwordInput, setPasswordInput] = useState('password');
  const [loading, setLoading] = useState(false);

  const privkey = useStronghold((state) => state.privkey);
  const pubkey = useOnboarding((state) => state.pubkey);

  const { save } = useSecureStorage();

  // toggle private key
  const showPassword = () => {
    if (passwordInput === 'password') {
      setPasswordInput('text');
    } else {
      setPasswordInput('password');
    }
  };

  const {
    register,
    setError,
    handleSubmit,
    formState: { errors, isDirty, isValid },
  } = useForm<FormValues>({ resolver });

  const onSubmit = async (data: { [x: string]: string }) => {
    setLoading(true);
    if (data.password.length > 3) {
      // save privkey to secure storage
      await save(pubkey, privkey, data.password);

      // redirect to next step
      navigate('/auth/import/step-3', { replace: true });
    } else {
      setLoading(false);
      setError('password', {
        type: 'custom',
        message: 'Password is required and must be greater than 3, please check again',
      });
    }
  };

  return (
    <div className="mx-auto w-full max-w-md">
      <div className="mb-8 text-center">
        <h1 className="text-xl font-semibold text-white">
          Set password to secure your key
        </h1>
      </div>
      <div className="flex flex-col gap-4">
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-3">
          <div className="flex flex-col gap-1">
            <div className="relative">
              <input
                {...register('password', { required: true })}
                type={passwordInput}
                className="relative h-11 w-full rounded-lg bg-white/10 px-3.5 py-1 text-center text-white !outline-none placeholder:text-white/50"
              />
              <button
                type="button"
                onClick={() => showPassword()}
                className="group absolute right-2 top-1/2 -translate-y-1/2 transform rounded p-1 hover:bg-white/10"
              >
                {passwordInput === 'password' ? (
                  <EyeOffIcon className="h-4 w-4 text-white/50 group-hover:text-white" />
                ) : (
                  <EyeOnIcon className="h-4 w-4 text-white/50 group-hover:text-white" />
                )}
              </button>
            </div>
            <div className="text-sm text-white/50">
              <p>
                Password is use to unlock app and secure your key store in local machine.
                When you move to other clients, you just need to copy your private key as
                nsec or hexstring
              </p>
            </div>
            <span className="text-sm text-red-400">
              {errors.password && <p>{errors.password.message}</p>}
            </span>
          </div>
          <div className="flex items-center justify-center">
            <button
              type="submit"
              disabled={!isDirty || !isValid}
              className="inline-flex h-11 w-full items-center justify-center rounded-lg bg-fuchsia-500 font-medium text-white hover:bg-fuchsia-600 disabled:pointer-events-none disabled:opacity-50"
            >
              {loading ? (
                <LoaderIcon className="h-4 w-4 animate-spin text-white" />
              ) : (
                'Continue →'
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
