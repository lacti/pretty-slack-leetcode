import SlackBlockElement from "./SlackBlockElement";

export default interface SlackRichTextBlock {
  type: "rich_text";
  block_id: string;
  elements: SlackBlockElement[];
}
