import { Header } from "./components/Header"
import { Sidebar } from "./components/Sidebar"
import { Post } from "./components/Post"

import styles from './App.module.css'

const posts = [
  {
    id: 1,
    author: {
      name: "Wellington Henrique",
      role: "Desenvolvedor Fullstack",
      avatarUrl: "https://github.com/Wellington-Henrique.png",
    },
    content: [
      {
        type: "paragraph",
        content: "Fala galeraa 👋"
      },
      {
        type: "paragraph",
        content: "Acabei de subir mais um projeto no meu portifólio. É um projeto que fiz na especialização de em React da Rocketseat. 🚀"
      },
      {
        type: "link",
        content: "https://github.com/Wellington-Henrique"
      },
    ],
    publishedAt: new Date('2024-02-24 23:49')
  }
]

function App() {
  return (
    <div>
      <Header/>

      <div className={styles.wrapper}>
        <Sidebar/>
        
        <main>
          {posts.map(post => 
            <Post 
              key={post.id}
              author={post.author}
              content={post.content}
              publishedAt={post.publishedAt}
            />)}
        </main>
      </div>
    </div>
  )
}

export default App
