### List of Backend APIs

<br />

#### ? -> optional, day value accepted -> [0-6];

- `login` -> `/api/auth/login`

  - `post` request
  - `body params` -> email, phone

- `register` -> `/api/auth/register`

  - `post` request
  - `body params` -> email, name, phone, password, confirmPassword

- `create company` -> `/api/companies`

  - `post` request
  - `header params` -> Authorization -> eg: Bearer <token>
  - `body params` -> name, address?, phone?, defaultStartingHour?, defaultClosingHour?

- `update company` -> `/api/companies/:id`

  - `patch` request
  - `header params` -> Authorization -> eg: Bearer <token>
  - `body params` -> name?, address?, phone?, defaultStartingHour?, defaultClosingHour?

- `get company details and hours` -> `/api/companies/:id`

  - `get` request

- `add or update business hours` -> `/api/companies/:id/open-hours`

  - `put` request
  - `header params` -> Authorization -> eg: Bearer <token>
  - `body params` -> openHours -> data eg:
    [{
    day: 0,
    startingHour: "10:00",
    closingHour: "17:00",
    isClosingDay? : true
    },
    {
    day: 1,
    startingHour: "10:00",
    closingHour: "17:00",
    isClosingDay? : true
    }]

- `update open hour of a day` -> `/api/companies/:id/open-hours/:hourId`
  - `patch` request
  - `header params` -> Authorization -> eg: Bearer <token>
  - `body params` -> startingHour?, closingHour?, isClosingDay?
