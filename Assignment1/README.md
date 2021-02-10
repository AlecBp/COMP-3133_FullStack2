# Hotel x User x Booking - GraphQL API demo

```
query hotels {
  hotels {
    hotelName
    street
    city
    postalCode
    price
    email
  }
}

query hotelByName {
  hotelByName(hotelName: "Hotel") {
    id
    hotelName
    street
    city
    postalCode
    price
    email
  }
}

query hotelByCity {
  hotelByCity(city: "Vancouver") {
    id
    hotelName
    street
    city
    postalCode
    price
    email
  }
}

query bookings {
  bookings(userId: "") {
    id
    bookingStart
    bookingEnd
    user {
      id
    }
    hotel {
      id
    }
    createdAt
  }
}

query users {
  users {
    id
    username
    password
    email
    createdAt
  }
}
mutation addUser {
  addUser(
    userInput: {
      username: "alec"
      password: "password"
      email: "alec.paglia@gmail.com"
    }
  ) {
    id
    username
    password
    email
    createdAt
  }
}

mutation addBooking {
  addBooking(
    bookingInput: {
      userId: ""
      hotelId: ""
      bookingStart: "01-01-2020"
      bookingEnd: "02-02-2020"
    }
  ) {
    id
    bookingStart
    bookingEnd
    user {
      id
    }
    hotel {
      id
    }
    createdAt
  }
}

mutation addHotel {
  addHotel(
    hotelInput: {
      hotelName: "Hotel"
      street: "123 Avenue"
      city: "Vancouver"
      postalCode: "M1M3B3"
      price: 400
      email: "hotel@gmail.com"
    }
  ) {
    id
    hotelName
    street
    city
    postalCode
    price
    email
  }
}
```