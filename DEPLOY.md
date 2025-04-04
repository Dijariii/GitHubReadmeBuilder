# Deployment Guide for Readme Generator

This guide explains how to deploy the Readme Generator application to Vercel.

## Prerequisites

- A [Vercel](https://vercel.com) account
- Git repository for the project (e.g., GitHub, GitLab, etc.)

## Deployment Steps

### 1. Prepare for Vercel Deployment

The project includes a `vercel.json` configuration file that has been pre-configured for deployment to Vercel. This file tells Vercel how to build and deploy your application.

### 2. Connect to Vercel

1. Push your code to a Git repository if you haven't already
2. Log in to your Vercel account
3. Click "New Project"
4. Import your repository from GitHub, GitLab, or Bitbucket
5. Select the repository containing this project

### 3. Configure Project Settings

When configuring the project in Vercel:

- **Framework Preset**: Select "Other"
- **Build Command**: Use the default: `npm run build`
- **Output Directory**: Use the default: `dist`
- **Install Command**: Use the default: `npm install`

### 4. Environment Variables

If your application requires any environment variables, add them in the Vercel project settings.

### 5. Deploy

Click "Deploy" to start the deployment process. Vercel will build and deploy your application.

## Troubleshooting

If you encounter any issues during deployment:

1. Check the build logs in Vercel for any errors
2. Ensure all dependencies are correctly listed in `package.json`
3. Verify your `vercel.json` configuration is correct

## Continuous Deployment

Vercel automatically sets up continuous deployment from your Git repository. Any changes pushed to your main branch will trigger a new deployment.

## Custom Domain (Optional)

To use a custom domain:

1. Go to your project settings in Vercel
2. Navigate to the "Domains" section
3. Add your custom domain and follow the verification steps

## Resources

- [Vercel Documentation](https://vercel.com/docs)
- [Vercel CLI](https://vercel.com/cli) for local testing