import React, { useState, useEffect } from "react"
import styled from "styled-components"
import { graphql } from "gatsby"


const stripeSchema = []

const menuData =
  {
    Salads: [
      {
        name: "Chef's Salad",
        description:
          "An American salad consisting of hard-boiled eggs; one or more varieties of meat, such as ham, turkey, chicken, or roast beef; tomatoes; cucumbers; and cheese; all placed upon a bed of tossed lettuce or other leaf vegetables.",
        price: 12,
      },
      {
        name: "Greek Salad",
        description:
          "heirloom tomato, cucumber, red onionfeta, kalamata olive, red wine vinaigrette",
        price: 13,
      },
      {
        name: "House Salad",
        description:
          "organic mesclun lettuce, carrot, red onion, celery, olive oil and vinegar",
        price: 10,
      },
    ],
    Dinner: [
      {
        name: "Spicy Shrimp Scampi",
        description: "garlic, chili, herbs, focaccia",
        price: 12,
      },
      {
        name: "Truffle Fries",
        description: "white truffle oil, parmesan",
        price: 12,
      },
      {
        name: "Chorizo Bacon Hash",
        description: "dried chorizo, potato, red bell pepper",
        price: 12,
        sides: [
          {
            name: "red onion, fried egg",
            price: 1,
          },
          {
            name: "feta",
            price: 1,
          },
          {
            name: "avocado",
            price: 3,
          },
        ],
      },
    ],
  }

const categories = Object.keys(menuData)

const MenuStyles = styled.div`
  min-height: 100vh;
  padding-top: 40px;
  color: #404044;
  .menu-title-block {
    text-align: center;
    .menu-title {
      font-family: Lora;
    }
    p {
      color: #7d7d7d;
    }
  }

  .menu-item {
    .price {
      font-size: 24px;
      color: #404044;
      font-family: "Lora", Georgia, serif;
      margin: 0px;
    }
    .name {
      margin: 10px 0 10px 0;
      font-size: 16px;
      font-weight: 700;
    }
    .description {
      color: #7d7d7d;
      font-size: 14px;
      margin-bottom: 1.5em;
      font-weight: 400;
      font-family: "Poppins", Arial, sans-serif;
    }
  }

  .menu-items-block {
    max-width: 800px;
    margin: 15px auto;
    .menu-item {
      max-width: 300px;
      margin: auto;
    }
    @media (min-width: 1025px) {
      display: grid;
      grid-template-columns: 50% 50%;
    }
  }

  .menu-category {
    margin: auto;
    max-width: 800px;
    text-align: center;
    ul {
      margin: auto;
      li {
        list-style: none;
        display: inline-block;
        margin: 20px;
        position: relative;
        a,
        a:visited {
          text-decoration: none;
          color: #404044 !important;
        }
      }

      li.active a:after {
        position: absolute;
        bottom: -5px;
        left: 0;
        right: 0;
        content: "";
        width: 100%;
        height: 2px;
        background: #ff6107;
        margin: 0 auto;
      }
    }
  }
`
const MenuComponent = ({ data }) => {
  const categories = [...new Set(data.map(item => item.menu))]

  const [currentCategory, setCurrentCategory] = useState(categories[0])
  const [cart, setCart] = useState(stripeSchema)

  const addToCart = (e, data) => {
    const product = {
      id: data.name,
      currency: 'USD',
      price: data.price,
      attributes: {
        name: data.name
      },
      quantity: 1,
    }
    
    setCart([...cart, product])

  }

  const checkout = () => {

  }
  return (
    <MenuStyles>
      <div className="menu-title-block">
        <h2 className="menu-title">Our Delicious Menu</h2>
        <p>
          You have to enjoy the best food that money can buy all over the world
        </p>
      </div>
      <div className="menu-category">
        <ul>
          {categories.map((category, index) => {
            console.log(`category: ${category}, currentCategory: ${currentCategory}`)
            return (
              <li
                key={index}
                className={
                  currentCategory === category ? "active" : ""
                }
              >
                <a
                  href={`#${category}`}
                  onClick={e => {
                    e.preventDefault()
                    setCurrentCategory(category)
                  }}
                >
                  {category}
                </a>
              </li>
            )
          })}
        </ul>
      </div>
      <div className="menu-items-block">
        {data.filter((item) => item.menu === currentCategory).map((data, index) => {
          return (
            <div className="menu-item" key={index}>
              <p className="price">${data.price}</p>
              <p className="name">{data.name}</p>
              <p className="description">{data.description}</p>
              <button onClick={e => addToCart(e, data)}>add to cart</button>
            </div>
          )
        })}
      </div>
    </MenuStyles>
  )
}

export default MenuComponent
