export default interface LeetcodeQuestion {
  data: {
    question: {
      questionId: string;
      questionFrontendId: string;
      boundTopicId: string | null;
      title: string;
      titleSlug: string;
      content: string;
      translatedTitle: string | null;
      translatedContent: string | null;
      isPaidOnly: boolean;
      difficulty: string;
      likes: number;
      dislikes: number;
      isLinked: string | null;
      similarQuestions: string;
      exampleTestcases: string;
      contributors: string[];
      topicTags: {
        name: string;
        slug: string;
        translatedName: string;
        __typename: string;
      }[];
      companyTagStats: string | null;
      codeSnippets: {
        lang: string;
        langSlug: string;
        code: string;
        __typename: string;
      }[];
      stats: string;
      hints: string[];
      solution: string | null;
      status: string | null;
      sampleTestCase: string;
      metaData: string;
      judgeType: string;
      mysqlSchemas: string[];
      enableRunCode: boolean;
      enableTestMode: boolean;
      enableDebugger: boolean;
      envInfo: string;
      libraryUrl: string | null;
      adminUrl: string | null;
      __typename: string;
    };
  };
}
