import { ChangeEvent, FormEvent, InvalidEvent, ReactHTML, useState } from 'react'
import { format, formatDistanceToNow } from 'date-fns'
import ptBR from 'date-fns/locale/pt-BR'

import { Avatar } from './Avatar'
import { Comment } from './Comment'

import styles from './Post.module.css'

interface Author {
    name: string
    role: string
    avatarUrl: string
}

interface Comment {
    id: string
    content: string
}

interface Content {
    type: 'paragraph' | 'link'
    content: string
}

interface PostProps {
    author: Author
    publishedAt: Date
    content: Content[]
}

export function Post({author, publishedAt, content} : PostProps) {
    const [comments, setComments] = useState<Comment[]>([{id: '1', content: 'Muito bom, parabéns!! 👏👏'}]);
    const [currentComment, setCurrentComment] = useState('')

    const publisheDateFormatted = format(publishedAt, "d 'de' LLLL 'às' HH:mm'h'", {
        locale: ptBR
    })

    const publisheDateRelativeToNow = formatDistanceToNow(publishedAt, {
        locale: ptBR,
        addSuffix: true
    })

    const isNewCommentEmpty = currentComment.length === 0

    const handleChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
        const { value } = e.target

        setCurrentComment(value)
        e.target.setCustomValidity('')
    }
    
    const handleNewCommentInvalid = (e: InvalidEvent<HTMLTextAreaElement>) => {
        e.target.setCustomValidity('Este campo é obrigatório!')
    }

    const handleCreateNewCommit = (e: FormEvent) => {
        e.preventDefault()
        
        setComments(prev => [...prev, {id: `${prev.length + 1}`, content: currentComment}])
        setCurrentComment('')
    }

    const handleDeleteComment = (id: string) => {
        const commentWithoutDeletedOne = comments.filter(comment => comment.id !== id);
        setComments(commentWithoutDeletedOne)
    }

    return(
        <article className={styles.post}>
            <header>
                <div className={styles.author}>
                    <Avatar src={author.avatarUrl}/>

                    <div className={styles.authorInfo}>
                        <strong>{author.name}</strong>
                        <span>{author.role}</span>
                    </div>
                </div>

                <time 
                    title={publisheDateFormatted}
                    dateTime={publishedAt.toISOString()}>
                    {publisheDateRelativeToNow}
                </time>
            </header>

            <div className={styles.content}>
                {content.map(line => {
                    if (line.type === 'paragraph')
                        return <p>{line.content}</p>
                    else if (line.type === 'link')
                        return <p><a href={line.content} target='_blank'>{line.content}</a></p>
                })}
            </div>

            <form className={styles.commentForm} onSubmit={handleCreateNewCommit}>
                <strong>Deixe seu feedback</strong>
                <textarea 
                    placeholder='Deixe um comentário'
                    value={currentComment}
                    onChange={handleChange}
                    required
                    onInvalid={handleNewCommentInvalid}
                />
                
                <footer>
                    <button 
                        type='submit'
                        disabled={isNewCommentEmpty}
                    >Publicar</button>
                </footer>
            </form>

            <div className={styles.commentList}>
                {comments.map(comment => 
                    <Comment 
                        key={comment.id}
                        comment={comment}
                        onDelete={handleDeleteComment}
                    />
                )}
            </div>
        </article>
    )
}