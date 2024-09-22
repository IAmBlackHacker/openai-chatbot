from langchain_openai import ChatOpenAI
from langchain.chains import ConversationChain
from langchain.memory import ConversationBufferMemory

# Initialize the memory
memory = ConversationBufferMemory()

llm = ChatOpenAI(model_name="gpt-4", temperature=0.7)

# Create a conversation chain with memory
conversation = ConversationChain(
    llm=llm,
    memory=memory
)

def ask_question(user_input):
    return conversation.run(user_input)
