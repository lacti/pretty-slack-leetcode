import SlackTextBlock from "./SlackTextBlock";

export default interface SlackRichTextPreformattedBlock {
  type: "rich_text_preformatted";
  elements: SlackTextBlock[];
}
