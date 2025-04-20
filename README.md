# Psionic Muse Viewer

Pisonic Muse Viewer is a project to collect and annotate data around Anomalous Cognitive Experiences with the ultimate goal of training a model the experiences.

Our system uses Remote Viewing sessions as a repeatable anomalous cognitive experience. We allow the user to upload EEG data, as well as video data of their EEG session, and then annotate specific timestamps where its believed an anomalous cognitive event has occured. 

We also include some AI tools for automatically assessing and grading Remote Viewing sessions to remove self-grading bias


https://github.com/user-attachments/assets/316ff2dd-0702-421e-a23d-e29f48fd6999


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
