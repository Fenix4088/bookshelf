/** @jsx jsx */
import {jsx} from '@emotion/core'

import './bootstrap'
import React from 'react';
import Tooltip from '@reach/tooltip'
import {FaSearch} from 'react-icons/fa'
import {Input, BookListUL, Spinner} from './components/lib'
import {BookRow} from './components/book-row'
import {client} from './utils/api-client'

function DiscoverBooksScreen() {
    const [{status, data, query}, setQueryState] = React.useState({
        status: 'idle', // 'idle', 'loading', or 'success'
        data: null,
        query: ''
    });

    const [queried, setQueried] = React.useState(false);

    const isLoading = status === 'loading';
    const isSuccess = status === 'success';

    React.useEffect(() => {
        if (!queried) return;

        setQueryState(s => ({...s, status: 'loading'}));

        client(`books?query=${encodeURIComponent(query)}`).then(data => {
            setQueryState(s => ({...s, status: 'success', data}));
        })
    }, [query, queried])

    function handleSearchSubmit(event) {
        event.preventDefault();
        setQueried(true);
        setQueryState(s => ({...s, query: event.target.elements.search.value}));
    }

    return (
        <div
            css={{maxWidth: 800, margin: 'auto', width: '90vw', padding: '40px 0'}}
        >
            <form onSubmit={handleSearchSubmit}>
                <Input
                    placeholder="Search books..."
                    id="search"
                    css={{width: '100%'}}
                />
                <Tooltip label="Search Books">
                    <label htmlFor="search">
                        <button
                            type="submit"
                            css={{
                                border: '0',
                                position: 'relative',
                                marginLeft: '-35px',
                                background: 'transparent',
                            }}
                        >
                            {isLoading ? <Spinner/> : <FaSearch aria-label="search"/>}
                        </button>
                    </label>
                </Tooltip>
            </form>

            {isSuccess ? (
                data?.books?.length ? (
                    <BookListUL css={{marginTop: 20}}>
                        {data.books.map(book => (
                            <li key={book.id} aria-label={book.title}>
                                <BookRow key={book.id} book={book}/>
                            </li>
                        ))}
                    </BookListUL>
                ) : (
                    <p>No books found. Try another search.</p>
                )
            ) : null}
        </div>
    )
}

export {DiscoverBooksScreen}
