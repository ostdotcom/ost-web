# Note this secret has to be same for company-web & company-api in order to make CSRF work
# As FE uses staging ENV for local testing, this should be in sync with Staging API Secret
export COMPANY_SECRET_KEY_BASE='b1f0ff90cd692556f9740a8e609f88f2f4fc15d9dda9035445a7577c3f94936eaae91a0793c4ad5500314fe5a526a3b3f7c7c71c303f883d903df138783a8225'

# Cloudfront details
export OW_CLOUDFRONT_DOMAIN=''

# Company API details
export OW_ROOT_URL='http://developmentost.com:8080/'

# Basic Auth credentials
export OW_BASIC_AUTH_USERNAME='ost'
export OW_BASIC_AUTH_PASSWORD='A$F^&n!@$ghf%7'

# Memcached instances
export OW_MEMCACHED_INSTANCES='127.0.0.1:11211'

# Recaptcha site key
export OST_RECAPTCHA_SITE_KEY="6LfbfzQUAAAAAObwp0iXySZxH69WXY6NsLdKZF6B"

# OST Other Product Urls
export COMPANY_KIT_ROOT_URL='http://kit.developmentost.com:8080/'
export COMPANY_KYC_ROOT_URL='http://kyc.developmentost.com:8080/'
export COMPANY_VIEW_ROOT_URL='http://view.developmentost.com:8080/'
export COMPANY_SIMPLE_TOKEN_URL='http://developmentsimpletoken.org:8080/'
export COMPANY_TOKEN_SALE_URL='http://sale.developmentsimpletoken.org:8080/'
export COMPANY_DEV_ROOT_URL='http://dev.developmentost.com:8080/'

# OST.com (token sale account) Pepo Campaigns Account details
export STW_CAMPAIGN_ENCRYPTED_CLIENT_ID='bfda650a78cf3e2d2b1476931cb3c1fb'
export STW_CAMPAIGN_ENCRYPTED_LIST_ID='01bb39c3b883a6e5'

# cms environment
export STW_CMS_URL='https://cms.developmentost.com/'
export STW_CMS_SHA256_SALT='40a8e609f88f2f4fc15d9dda9035445a7577c3f94936eaae91a0793c'

# KIT Communitcation secret key
export OW_SUBENV_COMMUNICATION_SERVER_SECRET_KEY='1somethingsarebetterkeptinenvironemntvariables'


# Invision OST Prototypes
export OW_INVISION_ROOT_URL='http://developmentost.com:8085/ost-web-prototypes/dev'