const { PrismaClient } = require('@prisma/client');
const { faker } = require('@faker-js/faker');
const prisma = new PrismaClient();

async function main() {
  console.log("Seeding database...");

  for (let i = 0; i < 10000; i++) {
    const uniqueSuffix = faker.string.uuid();

    const country = await prisma.country.create({
      data: {
        name: `${faker.location.country()}-${uniqueSuffix}`,
      },
    });

    const region = await prisma.region.create({
      data: {
        name: `${faker.location.state()}-${uniqueSuffix}`,
        countryId: country.id,
      },
    });

    const city = await prisma.city.create({
      data: {
        name: `${faker.location.city()}-${uniqueSuffix}`,
        regionId: region.id,
      },
    });

    const district = await prisma.district.create({
      data: {
        name: `${faker.location.street()}-${uniqueSuffix}`,
        cityId: city.id,
      },
    });

    const user = await prisma.user.create({
      data: {
        fullName: faker.person.fullName(),
        email: `${uniqueSuffix}-${faker.internet.email()}`,
        password: faker.internet.password(),
        imageUrl: faker.image.avatar(),
        phoneNum: faker.phone.number(),
      },
    });

    const category = await prisma.category.create({
      data: {
        name: `${faker.commerce.department()}-${uniqueSuffix}`,
      },
    });

    const subCategory = await prisma.subCategory.create({
      data: {
        name: `${faker.commerce.productName()}-${uniqueSuffix}`,
        categoryId: category.id,
      },
    });

    const animalSpecies = await prisma.animalSpecies.create({
      data: {
        name: `${faker.animal.type()}-${uniqueSuffix}`,
      },
    });

    const breed = await prisma.breed.create({
      data: {
        name: `${faker.animal.dog()}-${uniqueSuffix}`,
        speciesId: animalSpecies.id,
      },
    });

    const animal = await prisma.animal.create({
      data: {
        name: faker.person.firstName(),
        speciesId: animalSpecies.id,
        breedId: breed.id,
        age: faker.number.int({ min: 1, max: 15 }),
        description: faker.lorem.sentence(),
      },
    });

    await prisma.post.create({
      data: {
        title: faker.lorem.sentence(),
        description: faker.lorem.paragraph(),
        categoryId: category.id,
        userId: user.id,
        contactPhoneNum: faker.phone.number(),
        expirationDate: faker.date.future(),
        imgUrls: [faker.image.url()],
        country_id: country.id,
        region_id: region.id,
        city_id: city.id,
        district_id: district.id,
        animalId: animal.id,
      },
    });
  }

  console.log("Seeding completed.");
}

main()
  .catch(e => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
