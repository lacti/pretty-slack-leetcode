# Pretty Leetcode from Slack threads

Make Leetcode solutions as pretty from Slack threads!

## Prerequisite

- [Node.js 14](https://nodejs.org/)
- [mkdocs](https://mkdocs.org/)

## Quick start

First, download Slack export data and dump them into `data/slack_yyyyMMdd` directory, and,

```bash
yarn
yarn start username
```

then, you can see all markdown files in `output` directory. You can see html rendered files by `mkdocs` to run `mkdocs serve`.

If you want to render and deploy them to S3 and CloudFront,

1. Deploy CloudFormation stack in `stack/S3-CloudFront.yaml` with parameters.

   - `BucketName` which is the name of S3 Bucket to serve html files.
   - `CertificationArn` which is ACM certificate Arn in `us-east-1` for CloudFront.
   - `Domain` which is "yourdomain.tld".
   - `SubDomain` which is "subdomain" from "subdomain.yourdomain.tld".

2. Prepare `mkdocs` using `pip install -U pip mkdocs mkdocs-material plantuml_markdown`.
3. Run `yarn deploy username...`.
4. Check the website, <https://subdomain.yourdomain.tld/URL_PREFIX/username>.

### Environment

Please see [`.envrc.example`](.envrc.example) file. Copy it to `.envrc` file and set all variables properly.

All variables has a trivial value but `URL_PREFIX` is not. `URL_PREFIX` should start with `/` character and should not end with `/` character but it can be `/` if you do not want to use any prefix path. For example, it can be `/` or `/something-prefix`.

### Deploy Stack

You can easily setup your CDN to serve these files using `stack/S3-CloudFront.yaml`.

```bash
aws cloudformation deploy \
  --stack-name your-awesome-cdn-stack \
  --template-file stack/S3-CloudFront.yaml \
  --parameter-overrides \
    Domain=yourdomain.tld \
    SubDomain=subdomain \
    BucketName=subdomain.yourdomain.tld \
    CertificateArn=arn:aws:acm:us-east-1:ACCOUNT_ID:certificate/CERTIFICATE_UUID
```

Or, you can use environment variable which set from `.envrc`.

```bash
aws cloudformation deploy \
  --stack-name your-awesome-cdn-stack \
  --template-file stack/S3-CloudFront.yaml \
  --parameter-overrides \
    Domain=${DOMAIN} \
    SubDomain=${SUB_DOMAIN} \
    BucketName=${UBKCET_NAME} \
    CertificateArn=arn:aws:acm:us-east-1:ACCOUNT_ID:certificate/CERTIFICATE_UUID
```

It would be took about 3~4 minutes.

## License

MIT
