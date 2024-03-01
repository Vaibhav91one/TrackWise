"use client"

import { scrapeAndStoreProduct} from "@/lib/actions";
import { FormEvent, useState } from "react"

type Props = {}

const Searchbar = (props: Props) => {

  const [searchPrompt, setSearchPrompt] = useState("");
  const [isLoading, setIsLoading] = useState(false)

  const isValidAmazonProductURL = (url: string) => {
    try {

      const parsedURL = new URL(url);

      const hostname = parsedURL.hostname;

      //check if hostname contains amazon

      if (hostname.includes('amazon.com') ||
        hostname.includes('amazon.') ||
        hostname.includes('amazon')
      ) {
        return true;
      }

    } catch (error) {
      return false
    }

    return false
  }

  const handleSubmit = async(event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const isValidLink = isValidAmazonProductURL(searchPrompt);

   if(!isValidLink) return alert("Please provide a vaild link..")

    try {
      setIsLoading(true)

      const product = await scrapeAndStoreProduct(searchPrompt)

    } catch (error) {
      console.log(error)
    }
    finally{
      setIsLoading(false)
    }

  }

  return (
    <form className='flex flex-wrap gap-4 mt-12' onSubmit={handleSubmit}>
      <input
        value={searchPrompt}
        onChange={(e) => { setSearchPrompt(e.target.value) }}
        type="text"
        placeholder="Enter Product Link.."
        className="searchbar-input" />
      <button type="submit" className="searchbar-btn" disabled={searchPrompt === ''}>
        {isLoading ? 'Searching' : 'Search'}
      </button>
    </form>
  )
}

export default Searchbar