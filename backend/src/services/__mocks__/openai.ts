const mockCreateCompletion = jest.fn();

class OpenAI {
  chat = {
    completions: {
      create: mockCreateCompletion,
    },
  };
}

export { OpenAI, mockCreateCompletion };
