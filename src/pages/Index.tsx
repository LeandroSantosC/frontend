import Header from "../components/Header/Header"
// import Board from "../components/Board";
import Tools from "../components/Tools/Tools"
import Content from "../components/Content/Content";
import MainBoard from "../components/MainBoard/MainBoard";
import { MainBoardProvider } from "../context/MainboardContext";
import { ToolsProvider } from "../context/ToolsContext";
import { CardProvider } from "../context/CardContext";
import SignUp from "../components/Form/RegisterForm";
import SignIn from "../components/Form/LoginForm";
import { AuthProvider } from "../context/AuthContext";
import { BoardProvider } from "../context/BoardContext";
import UpdateForm from "../components/Form/UpdateForm";

export default function Index() {

  return (
    <div className="flex flex-col h-screen w-screen overflow-hidden">
      <AuthProvider>
        <MainBoardProvider>
          <ToolsProvider>
            <CardProvider>
              <BoardProvider>
              <Header />
              <MainBoard />
              <Tools />
              <Content />
              </BoardProvider>
            </CardProvider>
          </ToolsProvider>
        </MainBoardProvider>
        <SignUp />
        <SignIn />
        <UpdateForm />
      </AuthProvider>
    </div>
  );
}