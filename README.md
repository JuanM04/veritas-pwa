<p align="center">
<img src="static/Logo-64.png" width="60" />
</p>

<h1 align="center">Veritas</h1>

<br />

<p align="center">
  <a href="https://zeit.co/now">
    <img src="https://img.shields.io/badge/now-v2-000000.svg?style=for-the-badge&logo=zeit" />
  </a>
  <a href="https://nextjs.org/">
    <img src="https://img.shields.io/badge/Next.js-v8.1.0-000000.svg?style=for-the-badge&logo=next.js" />
  </a>
  <a href="https://www.prisma.io/">
    <img src="https://img.shields.io/badge/MySQL-Prisma-4479A1.svg?style=for-the-badge&logo=mysql" />
  </a>
</p>

<br />

<p align="center">
  <a href="https://veritas.juanm04.com"><strong>Official Page</strong></a> •
  <a href="https://hub.juanm04.com/veritas"><strong>Changelog</strong></a>
</p>


### Getting Started

```bash
yarn global add now
now login
yarn install
now dev
```

<br />

### Folder Structure
| Folder        | Content                                         |
|:-------------:|:------------------------------------------------|
| `components/` | Next.js components                              |
| `pages/`      | Next.js pages                                   |
| `static/`     | Next.js static files                            |
| `api/`        | Express endpoints (lambdas)                     |
| `utils/`      | Metadata and common funcitons (Next.js and API) |
| `prisma/`     | Prisma configuration and client                 |
| `design/`     | Sketch files                                    |


<br />

### Environment Variables

- `PASSWORD`: Password to access (used in `/acceder`)
- `JWT_SECRET`: Secret for JsonWebTokens
- `PRISMA_SECRET`: Secret to use with Prisma Cloud

<br />

### Prisma Deployment
You should change `endpoint` in `prisma/prisma.yml`
```bash
yarn global install prisma
prisma login
cd prisma
prisma deploy -e ../.env
```