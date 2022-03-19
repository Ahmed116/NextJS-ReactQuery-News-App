import React, { useState } from 'react'
import { useQuery } from 'react-query'
import useArticles from '../../hooks/useArticles'
import { Menu, Dropdown, Button, Input, Image, Card, Tooltip } from 'antd'
import { DownOutlined, DeleteOutlined } from '@ant-design/icons'
import Link from 'next/link'
import styles from './_styles.module.scss'

const Articles = () => {
  const [search, setSearch] = useState('')
  const { data, status } = useQuery('articles', useArticles())
  console.log('data', data)
  console.log('status', status)
  const Categories = [
    { id: 1, name: 'X Universe' },
    { id: 2, name: 'Elite: Dangerous' },
    { id: 3, name: 'Starpoint Gemini' },
    { id: 4, name: 'EVE Online' },
  ]

  const menu = (
    <Menu>
      {Categories.map((category) => (
        <Menu.Item key={category.id} onClick={() => refetch(category.id)}>
          <span>{category['name']} </span>
          <Tooltip title='Delete All Articles' color={'#e01032'}>
            <Button danger className={styles.dropBtn}>
              <DeleteOutlined />
            </Button>
          </Tooltip>
        </Menu.Item>
      ))}
    </Menu>
  )
  console.log(search, 'search')
  return (
    <div className={styles.main}>
      <Input
        placeholder='Search'
        onChange={(ev) => setSearch(ev.target.value)}
        value={search}
        enabled={search.length < 3 ? true : false}
      />
      <Dropdown overlay={menu} className={styles.dropdown}>
        <a className='ant-dropdown-link' onClick={(e) => e.preventDefault()}>
          Categories <DownOutlined />
        </a>
      </Dropdown>

      {status === 'success' &&
        data.data.map((article) => (
          <div className='site-card-border-less-wrapper' key={article.index}>
            <Link href={`https://www.alpha-orbital.com/news/${article.slug}`}>
              <a>
                <Card title={article.title} style={{ width: 900 }}>
                  <Tooltip title='Delete Article' color={'#e01032'}>
                    <Button
                      danger
                      style={{ marginleft: '20' }}
                      className={styles.cardBtn}
                    >
                      <DeleteOutlined />
                    </Button>
                  </Tooltip>
                  <Image
                    preview={false}
                    alt='example'
                    height={100}
                    src={`https://www.alpha-orbital.com/assets/images/post_img/${article.post_image}`}
                  ></Image>
                  <p>{article.date}</p>
                  <p>{article.excerpt.replace(/<(.|\n)*?>/g, '')}</p>
                </Card>
              </a>
            </Link>
          </div>
        ))}
    </div>
  )
}

export default Articles
