import { useEffect } from "react";
import { BrowserRouter, Route, Routes } from "react-router";
import Start from "./pages/Start";
import Play from "./pages/Play";
import Admin from "./pages/Admin";
import { AppLayout } from "./components/AppLayout";
import { useGetWordsQuery } from "./store/words";
function App() {
  const { data, isLoading } = useGetWordsQuery();

  useEffect(() => {
    if (!isLoading) console.log('RTK words:', data);
  }, [isLoading, data]);
  return (
    <BrowserRouter>
      <AppLayout>
        <Routes>
          <Route path="/" element={<Start />} />
          <Route path="/play" element={<Play />} />
          <Route path="/admin" element={<Admin />} />
        </Routes>
      </AppLayout>
    </BrowserRouter>
  )
}

export default App
