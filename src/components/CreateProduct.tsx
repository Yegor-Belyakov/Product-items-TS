import axios from 'axios'
import React, { useState } from 'react'
import ErrorMessage from './ErrorMessage'
import { IProduct } from './models'

const productData: IProduct = {
  title: '',
  price: 13.5,
  description: 'lorem ipsum set',
  image: 'https://i.pravatar.cc',
  category: 'electronic',
  rating: {
    rate: 42,
    count: 10
  }
}

interface CreateProductProps {
  onCreate: (product: IProduct) => void
}


export default function CreateProduct({onCreate}: CreateProductProps) {
  const [value, setValue] = useState('')
  const [error, setError] = useState('')


  const submitHandler = async (event:React.FormEvent) => {
    event.preventDefault()
    setError('')

    if(value.trim().length === 0) {
      setError('Please enter valid title')
      return
    }

     productData.title = value
   const response =  await axios.post<IProduct>('https://fakestoreapi.com/products', productData)
   onCreate(response.data)
  }
  

  return (
    <form onSubmit={submitHandler}>
      <input type={'text'} value={value} onChange={(e) => setValue(e.target.value)} className='border py-2 px-4 mb-2 w-full outline-0' placeholder='Enter product title...'></input>
      {error && <ErrorMessage error={error}/>}
      <button type='submit' className='py-2 px-4 border bg-gray-400 hover:text-white'>Create</button>
    </form>
  )
}
