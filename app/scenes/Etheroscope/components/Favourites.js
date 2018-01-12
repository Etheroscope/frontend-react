import React from 'react'
import styled from 'styled-components'

export default class Favourites extends React.Component {

  render() {
    const FavouritesLabel = styled.span`
      color: #f9f9f9;
      font-size: 20px;
      font-weight: 600;
      margin-right: 30px;
    `
    
    const Section = styled.section`
      margin-bottom: 15px;
    `
    
    const FavouriteDropDown = styled.div`
      display: none;
      position: absolute;
      background: #f9f9f9;
      list-style: none;
      flex-wrap: wrap;
      border-radius: 3px;
      margin-top: 9px;
      margin-left: -15px;
    `
    
    const FavouriteName = styled.button`
      color: #4B6575;
      margin-right: 10px;
      border-bottom: white 1px solid;
      text-decoration: none;
      cursor: pointer;
      padding: 8px 16px;
      background: #f9f9f9;
      font-weight: 600;
      border-radius: 3px;
      &:hover {
        cursor: default;
      };
      &:hover ${FavouriteDropDown} {
        display: block;
      }
    `
    
    const FavouriteContract = styled.a`
      color: #4B6575;
      margin-right: 10px;
      border-bottom: white 1px solid;
      text-decoration: none;
      padding: 8px 16px;
      background: #f9f9f9;
      font-weight: 600;
      border-radius: 3px;
    `

    const favourites = JSON.parse(localStorage.favourites || '[]')
    return (
      <Section>
        <FavouritesLabel>Favourites: </FavouritesLabel>
        {favourites.map((fav, index) =>
          (<FavouriteName key={index}>
            {fav.name}
            <FavouriteDropDown> 
            {fav.contracts.map(c => (
              <FavouriteContract key={c.address} href={`/contracts/${c.address}`}>{c.address}</FavouriteContract>
            ))}
            </FavouriteDropDown>
          </FavouriteName>)
        )}
      </Section>
    )
  }
}
