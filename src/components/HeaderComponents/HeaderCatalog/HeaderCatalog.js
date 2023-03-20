import { useState, useRef, useEffect } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import { useGetApiResource } from '../../../helper/network'
import { useHeader } from '../../../headerContext/headerContext'
import './HeaderCatalog.css'

const HeaderCatalog = ({ inMenu }) => {
  const { closeHeader } = useHeader()
  const navigate = useNavigate()
  //CATALOG LOGIC

  const { data: arrCategory } = useGetApiResource(
    'https://fakestoreapi.com/products/categories'
  )

  const clicklink = (linkText) => {
    setCatalogOpen((value) => !value)
    closeHeader()
    navigate(`/products/category/${linkText}`)
  }

  // STYLE CATALOG

  const [catalogOpen, setCatalogOpen] = useState(false)
  const listRef = useRef()
  const clickCatalogList = () => {
    setCatalogOpen((value) => !value)
  }
  const catalogListStyle = catalogOpen
    ? { height: listRef.current.scrollHeight }
    : null

  const classNameCatalogWrapper = inMenu
    ? 'catalog-wrapper inmenu'
    : 'catalog-wrapper'

  // RETURN

  return (
    <div className={classNameCatalogWrapper}>
      <div onClick={clickCatalogList} className='catalog-link'>
        catalog
      </div>
      <div ref={listRef} style={catalogListStyle} className='catalog-list'>
        {arrCategory
          ? arrCategory.map((categoryText, i) => {
              return (
                <div
                  className='catalog-item'
                  onClick={() => clicklink(categoryText)}
                >
                  {categoryText}
                </div>
              )
            })
          : null}
      </div>
    </div>
  )
}

export default HeaderCatalog
