import React from 'react'
const TestForm = () => {
    
   

  return (
    <div className='mt-5 pt-5'>
        <form>
            <label htmlFor="name" className='me-3' >Name:</label>
            <input type="text" name='name' placeholder='Please enter your name' autoComplete='off' />
            <br />
            {/* <label htmlFor="email" className='me-3 mt-3'>Email:</label>
            <input type="text" name='email'  placeholder='Please enter your email' autoComplete='off' /><br /> */}
            <button type='submit' className='mt-3'>Submit</button>
        </form>
    </div>
  )
}

export default TestForm