import React from 'react'

const AddressCard = ({item}) => {
  return (
    <div>
      <div className='space-y-3'>
        <p className='font-semibold'>{item?.firstName} {item?.lastName}</p>
        <p>{item?.streetAddress}, {item?.city}, {item?.state}, {item?.postalCode}</p>
        <div className='space-y-1'>
          <p className='font-semibold'>Phone Number</p>
          <p>{item?.phoneNumber}</p>
        </div>
      </div>
    </div>
  )
}

export default AddressCard