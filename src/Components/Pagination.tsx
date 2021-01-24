import React from 'react'

export const Pagination :React.FC<{pokemonPerPage:number,totalPokemons:number, paginate:any}> = (props) => {
    const pageNumbers = []

    for(let i = 1; i <= Math.ceil(props.totalPokemons/props.pokemonPerPage); i++) {
        pageNumbers.push(i)
    }
    return (
        <nav>
            <ul className="pagination">
                {pageNumbers.map(number => (
                    <li key={number} className="page-item">
                        <a onClick={() => props.paginate(number)} href="!#" className="page-link">{number}</a>
                    </li>
                ) )}
            </ul>
        </nav>
    )
}