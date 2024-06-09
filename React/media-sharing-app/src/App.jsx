import './App.css'
import Header from './components/Header'
import MediaPlayer from './components/media_player'
import { ImageUploader } from './components/image_uploader'
function App() {

  return (
    <>
    <Header/>
    <ImageUploader></ImageUploader>
    <MediaPlayer></MediaPlayer>
    
    </>
  )
}
export default App
