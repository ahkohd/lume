import { Tooltip } from "@shared/tooltip";

import ReplyMessageIcon from "@icons/replyMessage";

import { channelReplyAtom } from "@stores/channel";

import { useSetAtom } from "jotai";

export default function MessageReplyButton({
	id,
	pubkey,
	content,
}: { id: string; pubkey: string; content: string }) {
	const setChannelReplyAtom = useSetAtom(channelReplyAtom);

	const createReply = () => {
		setChannelReplyAtom({ id: id, pubkey: pubkey, content: content });
	};

	return (
		<Tooltip message="Reply to message">
			<button
				type="button"
				onClick={() => createReply()}
				className="inline-flex h-7 w-7 items-center justify-center rounded hover:bg-zinc-800"
			>
				<ReplyMessageIcon width={16} height={16} className="text-white" />
			</button>
		</Tooltip>
	);
}
