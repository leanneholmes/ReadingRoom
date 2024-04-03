using NUnit.Framework;
using FluentValidation.TestHelper;
using Application.BookClubs;
using Domain;

namespace Unit.Tests
{
    [TestFixture]
    public class DescriptionValidation
    {
        private BookClubValidator _validator;

        [SetUp]
        public void Setup()
        {
            _validator = new BookClubValidator();
        }

        [Test]
        public void Validate_WithValidDescription_ShouldNotHaveValidationError()
        {
            var bookClub = new BookClub
            {
                Description = "Valid description",
            };

            var result = _validator.TestValidate(bookClub);

            result.ShouldNotHaveValidationErrorFor(x => x.Description);
        }

        [Test]
        public void Validate_WithInvalidDescription_ShouldHaveValidationError()
        {
            var bookClub = new BookClub
            {
                Description = null, 
            };

            var result = _validator.TestValidate(bookClub);

            result.ShouldHaveValidationErrorFor(x => x.Description);
        }
    }
}
