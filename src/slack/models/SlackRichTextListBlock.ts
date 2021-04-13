import SlackRichTextSectionBlock from "./SlackRichTextSectionBlock";

export default interface SlackRichTextListBlock {
  type: "rich_text_list";
  elements: SlackRichTextSectionBlock[];
  style: string;
  indent: number;
}
