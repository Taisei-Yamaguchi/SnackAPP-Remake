# SnackAPP-Remake

## Project Ideas
- **Purpose** :
  - Create App for users to be able to view any snacks in many countries.
  - LoginUsers can use "like", "post","recieve suggestion" functions.
  - Non-LoginUsers can only use "search snacks" functions.
 
## User stories
>
   - Authenticate
    - Users can login.
    - Users can logout. (require auth)
    - Users can signup.
  - Search Snacks
    - Users can search snacks with 'filter' and 'order' query
    - if users loggedin, they can use "liked" search and "Your post" search. (require auth)
    - Users can select page and get search result depending on page.
    - Users can see snack-search-result.
  - Post Snacks
    - Users can post snacks they want to share. (require auth)
    - Users can delete snacks they shared. (require auth)
  - Like
    - Users can toggle "like","not-like" for each snack. (require auth)
    - Users can see like-count for each snack.
  - Recommended Snacks
    - Users can see popluar snacks among users.
    - Users can see popular snacks among users, based on their preference trends (maker,country,type),
  
## Wireframes
>
  - [SnackApp-Remake Wireframes](https://www.figma.com/file/bRm2ptN9PEzkjypeaQS0AY/SnackApp-Remake?type=whiteboard&node-id=0-1&t=n7E5jpMBWGspiw4r-0)
  - <img width="3415" alt="SnackApp-Remake" src="https://github.com/Taisei-Yamaguchi/SnackAPP-Remake/assets/119865966/1131cb9b-ef28-4b9c-bfa4-1241c7587117">

## User Flow Chart
## ERD
>
  - [SnackApp-Remake ERD]
  - ![SnackApp-Remake drawio](https://github.com/Taisei-Yamaguchi/SnackAPP-Remake/assets/119865966/9c6cf07b-6064-40f0-b5e3-5ad436dca54b)

## External API
>
  - <del>[お菓子の虜](https://sysbird.jp/toriko/webapi/)</del>
 
## Tech Choices
>
  - Frontend
    - Next.js 14.1.3 
    - Typescript 5.4.2
  - Backend
    - Python 3.11.3
    - Django 5.0.3
  - Database
    - PostgreSQL 14.10
  - Design
    - Tailwind 3.4.1 (daisyUI)
## References
> 
  - translator libraries?
