import { AccountContext } from '@components/accountProvider';
import { AvatarUploader } from '@components/avatarUploader';
import { RelayContext } from '@components/relaysProvider';

import { defaultChannelsAtom } from '@stores/channel';
import { DEFAULT_AVATAR, MESSAGE_RELAYS } from '@stores/constants';

import { dateToUnix } from '@utils/getDate';
import { createChannel } from '@utils/storage';

import * as Dialog from '@radix-ui/react-dialog';
import { Cancel, Plus } from 'iconoir-react';
import { useSetAtom } from 'jotai';
import { getEventHash, signEvent } from 'nostr-tools';
import { useContext, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { navigate } from 'vite-plugin-ssr/client/router';

export const CreateChannelModal = () => {
  const pool: any = useContext(RelayContext);
  const activeAccount: any = useContext(AccountContext);

  const [open, setOpen] = useState(false);
  const [image, setImage] = useState(DEFAULT_AVATAR);
  const [loading, setLoading] = useState(false);

  const setChannel = useSetAtom(defaultChannelsAtom);

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { isDirty, isValid },
  } = useForm();

  const onSubmit = (data: any) => {
    setLoading(true);

    const event: any = {
      content: JSON.stringify(data),
      created_at: dateToUnix(),
      kind: 40,
      pubkey: activeAccount.pubkey,
      tags: [],
    };
    event.id = getEventHash(event);
    event.sig = signEvent(event, activeAccount.privkey);

    // publish channel
    pool.publish(event, MESSAGE_RELAYS);
    // update jotai state
    setChannel((prev: any) => [
      ...prev,
      {
        event_id: event.id,
        metadata: { name: data.name, picture: data.picture, about: data.about },
        created_at: event.created_at,
      },
    ]);
    // reset form
    reset();
    setTimeout(() => {
      // insert to database
      createChannel(event.id, event.content, event.created_at);
      // close modal
      setOpen(false);
      // redirect to channel page
      navigate(`/channel?id=${event.id}`);
    }, 2000);
  };

  useEffect(() => {
    setValue('picture', image);
  }, [setValue, image]);

  return (
    <Dialog.Root open={open} onOpenChange={setOpen}>
      <Dialog.Trigger asChild>
        <div className="group inline-flex items-center gap-2 rounded-md px-2.5 py-1.5 hover:bg-zinc-900">
          <div className="inline-flex h-5 w-5 shrink items-center justify-center rounded bg-zinc-900 group-hover:bg-zinc-800">
            <Plus width={12} height={12} className="text-zinc-500" />
          </div>
          <div>
            <h5 className="text-sm font-medium text-zinc-500 group-hover:text-zinc-400">Add a new channel</h5>
          </div>
        </div>
      </Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 z-50 bg-black bg-opacity-30 backdrop-blur-md data-[state=open]:animate-overlayShow" />
        <Dialog.Content className="fixed inset-0 z-50 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center">
            <div className="relative flex h-min w-full max-w-lg flex-col gap-2 rounded-lg border border-zinc-800 bg-zinc-900">
              <div className="h-min w-full shrink-0 border-b border-zinc-800 px-5 py-6">
                <div className="flex flex-col gap-2">
                  <div className="flex items-center justify-between">
                    <h5 className="bg-gradient-to-br from-zinc-200 to-zinc-400 bg-clip-text text-2xl font-semibold leading-none text-transparent">
                      Create channel
                    </h5>
                    <Dialog.Close asChild>
                      <button
                        type="button"
                        autoFocus={false}
                        className="inline-flex h-5 w-5 items-center justify-center rounded hover:bg-zinc-900"
                      >
                        <Cancel width={20} height={20} className="text-zinc-300" />
                      </button>
                    </Dialog.Close>
                  </div>
                  <p className="leading-tight text-zinc-400">
                    Channels are freedom square, everyone can speech freely, no one can stop you or deceive what to
                    speech
                  </p>
                </div>
              </div>
              <div className="flex h-full w-full flex-col overflow-y-auto px-5 pb-5 pt-3">
                <form onSubmit={handleSubmit(onSubmit)} className="flex h-full w-full flex-col gap-4">
                  <input
                    type={'hidden'}
                    {...register('picture')}
                    value={image}
                    className="relative h-10 w-full rounded-lg border border-black/5 px-3 py-2 shadow-input shadow-black/5 !outline-none placeholder:text-zinc-400 dark:bg-zinc-800 dark:text-zinc-200 dark:shadow-black/10 dark:placeholder:text-zinc-500"
                  />
                  <div className="flex flex-col gap-1">
                    <label className="text-xs font-semibold uppercase tracking-wider text-zinc-400">Picture</label>
                    <div className="relative inline-flex h-36 w-full items-center justify-center overflow-hidden rounded-lg border border-zinc-900 bg-zinc-950">
                      <img src={image} alt="channel picture" className="relative z-10 h-11 w-11 rounded-md" />
                      <div className="absolute bottom-3 right-3 z-10">
                        <AvatarUploader valueState={setImage} />
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-col gap-1">
                    <label className="text-xs font-semibold uppercase tracking-wider text-zinc-400">
                      Channel name *
                    </label>
                    <div className="relative w-full shrink-0 overflow-hidden before:pointer-events-none before:absolute before:-inset-1 before:rounded-[11px] before:border before:border-fuchsia-500 before:opacity-0 before:ring-2 before:ring-fuchsia-500/20 before:transition after:pointer-events-none after:absolute after:inset-px after:rounded-[7px] after:shadow-highlight after:shadow-white/5 after:transition focus-within:before:opacity-100 focus-within:after:shadow-fuchsia-500/100 dark:focus-within:after:shadow-fuchsia-500/20">
                      <input
                        type={'text'}
                        {...register('name', { required: true, minLength: 4 })}
                        spellCheck={false}
                        className="relative h-10 w-full rounded-lg border border-black/5 px-3 py-2 shadow-input shadow-black/5 !outline-none placeholder:text-zinc-400 dark:bg-zinc-800 dark:text-zinc-200 dark:shadow-black/10 dark:placeholder:text-zinc-500"
                      />
                    </div>
                  </div>
                  <div className="flex flex-col gap-1">
                    <label className="text-xs font-semibold uppercase tracking-wider text-zinc-400">Description</label>
                    <div className="relative h-20 w-full shrink-0 overflow-hidden before:pointer-events-none before:absolute before:-inset-1 before:rounded-[11px] before:border before:border-fuchsia-500 before:opacity-0 before:ring-2 before:ring-fuchsia-500/20 before:transition after:pointer-events-none after:absolute after:inset-px after:rounded-[7px] after:shadow-highlight after:shadow-white/5 after:transition focus-within:before:opacity-100 focus-within:after:shadow-fuchsia-500/100 dark:focus-within:after:shadow-fuchsia-500/20">
                      <textarea
                        {...register('about')}
                        spellCheck={false}
                        className="relative h-20 w-full resize-none rounded-lg border border-black/5 px-3 py-2 shadow-input shadow-black/5 !outline-none placeholder:text-zinc-400 dark:bg-zinc-800 dark:text-zinc-200 dark:shadow-black/10 dark:placeholder:text-zinc-500"
                      />
                    </div>
                  </div>
                  <div className="flex h-14 items-center justify-between gap-1 rounded-lg bg-zinc-800 px-4 py-2">
                    <div className="flex flex-col gap-0.5">
                      <div className="inline-flex items-center gap-1">
                        <span className="text-sm font-bold leading-none text-zinc-200">Make Private</span>
                        <div className="inline-flex items-center rounded-md bg-zinc-400/10 px-2 py-0.5 text-xs font-medium ring-1 ring-inset ring-zinc-400/20">
                          <span className="bg-gradient-to-r from-fuchsia-300 via-orange-100 to-amber-300 bg-clip-text text-transparent">
                            Coming soon
                          </span>
                        </div>
                      </div>
                      <p className="text-sm leading-none text-zinc-400">
                        Private channels can only be viewed by member
                      </p>
                    </div>
                    <div>
                      <button
                        disabled
                        className="relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent bg-zinc-900 transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-fuchsia-600 focus:ring-offset-2"
                        role="switch"
                        aria-checked="false"
                      >
                        <span className="pointer-events-none inline-block h-5 w-5 translate-x-0 transform rounded-full bg-zinc-600 shadow ring-0 transition duration-200 ease-in-out"></span>
                      </button>
                    </div>
                  </div>
                  <div>
                    <button
                      type="submit"
                      disabled={!isDirty || !isValid}
                      className="inline-flex h-11 w-full transform items-center justify-center rounded-lg bg-fuchsia-500 font-medium text-white active:translate-y-1 disabled:cursor-not-allowed disabled:opacity-30"
                    >
                      {loading ? (
                        <svg
                          className="h-4 w-4 animate-spin text-black dark:text-white"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                        >
                          <circle
                            className="opacity-25"
                            cx="12"
                            cy="12"
                            r="10"
                            stroke="currentColor"
                            strokeWidth="4"
                          ></circle>
                          <path
                            className="opacity-75"
                            fill="currentColor"
                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                          ></path>
                        </svg>
                      ) : (
                        'Create channel'
                      )}
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
};
