import React, { useState } from 'react'
import { useQuery } from 'react-query'
import useArticles from '../../hooks/useArticles'
import { Menu, Dropdown, Button, Input, Image, Card, Tooltip,Typography  } from 'antd'
import { DownOutlined, DeleteOutlined } from '@ant-design/icons'
import Link from 'next/link'
import styles from './_styles.module.scss'

const { Title } = Typography;

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
    <Menu className={styles.menu}>
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
        placeholder='Search Articles...'
        onChange={(ev) => setSearch(ev.target.value)}
        value={search}
        enabled={search.length < 3 ? true : false}
      />
      <Dropdown overlay={menu} className={styles.dropdown}>
        <a className={styles.categories} onClick={(e) => e.preventDefault()}>
          Categories <DownOutlined />
        </a>
      </Dropdown>

      {status === 'success' &&
        data.data.map((article) => (
          <div className='site-card-border-less-wrapper' key={article.index}>
            <Link href={`https://www.alpha-orbital.com/news/${article.slug}`}>
              <a>
                <Card className={styles.card}title={<Title level={3}>{article.title}</Title>} style={{ width: 900 }}>
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
                    className={styles.cardImg}
                    preview={false}
                    alt='example'
                    height={100}
                    src={`https://www.alpha-orbital.com/assets/images/post_img/${article.post_image}`}
                  ></Image>
                  <p className={styles.date}>{article.date}</p>
                  <p className={styles.text}>{article.excerpt.replace(/<(.|\n)*?>/g, '')}</p>
                </Card>
              </a>
            </Link>
          </div>
        ))}
    </div>
  )
}

export default Articles
