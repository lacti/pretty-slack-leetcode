import SlackRichTextListBlock from "./SlackRichTextListBlock";
import SlackRichTextPreformattedBlock from "./SlackRichTextPreformattedBlock";
import SlackRichTextSectionBlock from "./SlackRichTextSectionBlock";
import SlackTextBlock from "./SlackTextBlock";

type SlackBlockElement =
  | SlackRichTextPreformattedBlock
  | SlackRichTextSectionBlock
  | SlackRichTextListBlock
  | SlackTextBlock;

export default SlackBlockElement;
