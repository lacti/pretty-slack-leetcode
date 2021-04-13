import SlackTextBlock from "./SlackTextBlock";

export default interface SlackRichTextSectionBlock {
  type: "rich_text_section";
  elements: SlackTextBlock[];
}
