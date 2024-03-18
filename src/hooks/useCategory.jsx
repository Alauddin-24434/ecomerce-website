import { useQuery } from "@tanstack/react-query";

const useCategory = () => {

  const { data, isFetching, error, refetch } = useQuery({
    queryKey: ['useCategory',],
    queryFn: async () => {
  

      const response = await fetch(`https://ecommerce-server-beta.vercel.app/products`)

      if (!response.ok) {
        throw new Error('Failed to fetch user data');
      }

      return await response.json();
    },
  });

  return { data, isFetching, error, refetch };
};

export default useCategory;
