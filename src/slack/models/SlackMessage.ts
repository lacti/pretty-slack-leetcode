import SlackRichTextBlock from "./SlackRichTextBlock";

export default interface SlackMessage {
  client_msg_id: string;
  type: string;
  text: string;
  user: string;
  ts: string;
  team: string;
  user_team: string;
  source_team: string;
  user_profile: {
    avatar_hash: string;
    image_72: string;
    first_name: string;
    real_name: string;
    display_name: string;
    team: string;
    name: string;
    is_restricted: boolean;
    is_ultra_restricted: boolean;
  };
  edited: {
    user: string;
    ts: string;
  };
  blocks: SlackRichTextBlock[];
  thread_ts: string;
  reply_count: number;
  reply_users_count: number;
  latest_reply: string;
  reply_users: string[];
  replies: { user: string; ts: string }[];
  attachments: {
    fallback: string;
    ts: string;
    author_id: string;
    author_subname: string;
    channel_id: string;
    channel_name: string;
    is_msg_unfurl: boolean;
    text: string;
    author_name: string;
    author_link: string;
    author_icon: string;
    mrkdwn_in: string[];
    color: string;
    from_url: string;
    is_share: boolean;
    footer: string;
  }[];
  is_locked: boolean;
  subscribed: boolean;
  last_read: string;
}
