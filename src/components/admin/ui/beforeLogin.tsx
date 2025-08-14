import Link from 'next/link'
import Image from 'next/image'

const LinkToHome = () => {
  return (
    <div
      className="link-to-home"
      style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}
    >
      <h4>
        <Link href={`${process.env.NEXT_PUBLIC_DOMAIN_URL}`}>
          <Image src="/uafanp-logo.svg" alt="UAFANP Logo" height={50} width={200} />
        </Link>
      </h4>
      <br />
      <p>
        To test the CMS, the demo login credentials are:
        <br />
        <strong>Email:</strong>demo@uafanp.org
        <br />
        <strong>Password:</strong>demoadmin123
      </p>
      <br />
    </div>
  )
}

export default LinkToHome
