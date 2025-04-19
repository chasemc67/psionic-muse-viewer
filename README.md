# Psionic Muse Viewer

## Development

Common commands:

```shellscript
npm run dev        # dev server
npm run test       # run unit tests
npm run storybook  # storybooks
npm run format     # prettier
```

## Deployment

Changes merged to main will auto-deploy to vercel

## DB Migrations

For DB migrations, use the supabase cli:

```shellscript
npx supabase link
npx supabase migration new my_new_table
npx supabase db reset
```

## About

See the [.cursorrules](./.cursorrules) file for an in-depth description of where to find things and how they're built
