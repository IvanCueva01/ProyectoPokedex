import { Heading, Link, SkeletonText, VStack } from "@chakra-ui/react";
import { Category } from "../types";

type Props = {
  categories: Category[];
  loading: boolean;
  selectedCategory: Category;
  setSelectedCategory: (category: Category) => void;
};

const selectedProps = {
  bgColor: "red.500",
  color: "white",
  fontWeight: "bold",
};
function SideNav({
  loading,
  categories,
  selectedCategory,
  setSelectedCategory,
}: Props) {
  return loading ? (
    <SkeletonText mt="1" noOfLines={8} spacing="6" skeletonHeight="2" />
  ) : (
    <>
      <Heading color="red.500" fontSize="12" fontWeight={"bold"} mb={4}>
        CATEGORIAS
      </Heading>
      <VStack align="stretch">
        {categories?.map((c) => (
          <Link
            onClick={() => setSelectedCategory(c)}
            px={2}
            py={1}
            borderRadius={5}
            key={c.name}
            _hover={{ textDecoration: "none" }}
            {...(selectedCategory.name === c.name && selectedProps)}
          >
            {c.name}
          </Link>
        ))}
      </VStack>
    </>
  );
}

export default SideNav;
