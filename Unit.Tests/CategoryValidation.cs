using NUnit.Framework;
using FluentValidation.TestHelper;
using Application.BookClubs;
using Domain;

namespace Unit.Tests
{
    [TestFixture]
    public class CategoryValidation
    {
        private BookClubValidator _validator;

        [SetUp]
        public void Setup()
        {
            _validator = new BookClubValidator();
        }

        [Test]
        public void Validate_WithValidCategory_ShouldNotHaveValidationError()
        {
            var bookClub = new BookClub
            {
                Category = "Valid Category",
            };

            var result = _validator.TestValidate(bookClub);

            result.ShouldNotHaveValidationErrorFor(x => x.Category);
        }

        [Test]
        public void Validate_WithInvalidCategory_ShouldHaveValidationError()
        {
            var bookClub = new BookClub
            {
                Category = null, 
            };

            var result = _validator.TestValidate(bookClub);

            result.ShouldHaveValidationErrorFor(x => x.Category);
        }
    }
}
