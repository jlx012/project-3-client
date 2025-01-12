import { 
    useState, 
    useEffect 
} from 'react'
import Card from 'react-bootstrap/Card'
import { Link } from 'react-router-dom'

//import LoadingScreen from '../shared/LoadingScreen'
//import { getAllBooks } from '../../api/books'
import messages from '../shared/AutoDismissAlert/messages'

// BooksIndex should make a request to the api
// To get all books
// Then display them when it gets them

// style for our card container
const cardContainerStyle = {
    display: 'flex',
    flexFlow: 'row wrap',
    justifyContent: 'center'
}

const BooksIndex = (props) => {
    const [books, setBooks] = useState(null)
    const [error, setError] = useState(false)

    const { msgAlert } = props

    console.log('Props in BooksIndex', props)

    useEffect(() => {
        console.log(props)
        getAllBooks()
            .then(res => setBooks(res.data.books))
            .catch(err => {
                msgAlert({
                    heading: 'Error Getting Books',
                    message: messages.getBooksFailure,
                    variant: 'danger',
                })
                setError(true)
            })
    }, [])

    if (error) {
        return <p>Error!</p>
    }

    // If books haven't been loaded yet, show a loading message
    if (!books) {
        return <LoadingScreen />
    } else if (books.length === 0) {
        return <p>No books yet. Better add some.</p>
    }

    const bookCards = books.map(book => (
        <Card style={{ width: '30%', margin: 5}} key={ book.id }>
            <Card.Header>{ book.fullTitle }</Card.Header>
            <Card.Body>
                <Card.Text>
                    <Link to={`/books/${book.id}`}>View { book.name }</Link>
                </Card.Text>
            </Card.Body>
        </Card>
    ))

    return (
        <div style={ cardContainerStyle }>
            { bookCards }
        </div>
    )
}

export default BooksIndex