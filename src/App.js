import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './components/Home';
import AddPost from './components/AddPost';
import Navbar from './components/Navbar';
import PostDetails from './components/PostDetails';
import Edit from './components/Edit';

function App() {
    return (
        <BrowserRouter>
            <Navbar />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/addpost" element={<AddPost />} />
                <Route path="/edit/:id" element={<Edit />} />
                <Route path="/posts/:id" element={<PostDetails />} />
                {/* <Route path="/posts/:id" element={<Delete />} /> */}
            </Routes>
        </BrowserRouter>
    );
}

export default App;
