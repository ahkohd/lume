import { useQuery } from '@tanstack/react-query';

import { ChatsListItem } from '@app/chat/components/item';
import { NewMessageModal } from '@app/chat/components/modal';
import { ChatsListSelfItem } from '@app/chat/components/self';

import { getChatsByPubkey } from '@libs/storage';

import { useAccount } from '@utils/hooks/useAccount';

export function ChatsList() {
  const { account } = useAccount();

  const {
    status,
    data: chats,
    isFetching,
  } = useQuery(
    ['chats'],
    async () => {
      const chats = await getChatsByPubkey(account.pubkey);
      const sorted = chats.sort(
        (a, b) => parseInt(a.new_messages) - parseInt(b.new_messages)
      );
      return sorted;
    },
    {
      enabled: account ? true : false,
    }
  );

  if (status === 'loading') {
    return (
      <div className="flex flex-col">
        <div className="inline-flex h-9 items-center gap-2.5 rounded-md px-2.5">
          <div className="relative h-6 w-6 shrink-0 animate-pulse rounded bg-zinc-800" />
          <div className="h-3 w-full animate-pulse rounded-sm bg-zinc-800" />
        </div>
        <div className="inline-flex h-9 items-center gap-2.5 rounded-md px-2.5">
          <div className="relative h-6 w-6 shrink-0 animate-pulse rounded bg-zinc-800" />
          <div className="h-3 w-full animate-pulse rounded-sm bg-zinc-800" />
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col">
      <NewMessageModal />
      {account ? (
        <ChatsListSelfItem data={account} />
      ) : (
        <div className="inline-flex h-9 items-center gap-2.5 rounded-md px-2.5">
          <div className="relative h-6 w-6 shrink-0 animate-pulse rounded bg-zinc-800" />
          <div className="h-3 w-full animate-pulse rounded-sm bg-zinc-800" />
        </div>
      )}
      {chats.map((item) => {
        if (account.pubkey !== item.sender_pubkey) {
          return <ChatsListItem key={item.sender_pubkey} data={item} />;
        }
      })}
      {isFetching && (
        <div className="inline-flex h-9 items-center gap-2.5 rounded-md px-2.5">
          <div className="relative h-6 w-6 shrink-0 animate-pulse rounded bg-zinc-800" />
          <div className="h-3 w-full animate-pulse rounded-sm bg-zinc-800" />
        </div>
      )}
    </div>
  );
}
