import { AccountContext } from '@components/accountProvider';
import { ActiveAccount } from '@components/multiAccounts/activeAccount';
import { InactiveAccount } from '@components/multiAccounts/inactiveAccount';

import { APP_VERSION } from '@stores/constants';

import LumeSymbol from '@assets/icons/Lume';

import { Plus } from 'iconoir-react';
import { useCallback, useContext } from 'react';

let accounts: any = [];

if (typeof window !== 'undefined') {
  const { getAccounts } = await import('@utils/storage');
  accounts = await getAccounts();
}

export default function MultiAccounts() {
  const activeAccount: any = useContext(AccountContext);

  const renderAccount = useCallback((account: { pubkey: string }) => {
    if (account.pubkey === activeAccount.pubkey) {
      return <ActiveAccount key={account.pubkey} user={account} />;
    } else {
      return <InactiveAccount key={account.pubkey} user={account} />;
    }
  }, []);

  return (
    <div className="flex h-full flex-col items-center justify-between px-2 pb-4 pt-3">
      <div className="flex flex-col gap-3">
        <a
          href="/explore"
          className="group relative flex h-11 w-11 shrink cursor-pointer items-center justify-center rounded-lg bg-zinc-900 hover:bg-zinc-800"
        >
          <LumeSymbol className="h-6 w-auto text-zinc-400 group-hover:text-zinc-200" />
        </a>
        {accounts.map((account: { pubkey: string }) => renderAccount(account))}
        <a
          href="/onboarding"
          className="group relative flex h-11 w-11 shrink cursor-pointer items-center justify-center rounded-lg border-2 border-dashed border-zinc-600 hover:border-zinc-400"
        >
          <Plus width={16} height={16} className="text-zinc-400 group-hover:text-zinc-200" />
        </a>
      </div>
      <div className="flex flex-col gap-0.5 text-center">
        <span className="animate-moveBg from-fuchsia-300 via-orange-100 to-amber-300 text-sm font-black uppercase leading-tight text-zinc-600 hover:bg-gradient-to-r hover:bg-clip-text hover:text-transparent">
          Lume
        </span>
        <span className="text-xs font-medium text-zinc-700">v{APP_VERSION}</span>
      </div>
    </div>
  );
}
