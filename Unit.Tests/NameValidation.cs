using NUnit.Framework;
using FluentValidation.TestHelper;
using Application.BookClubs;
using Domain;

namespace Unit.Tests
{
    [TestFixture]
    public class NameValidation
    {
        private BookClubValidator _validator;

        [SetUp]
        public void Setup()
        {
            _validator = new BookClubValidator();
        }

        [Test]
        public void Validate_WithValidName_ShouldNotHaveValidationError()
        {
            var bookClub = new BookClub
            {
                Name = "Book Club Name",
            };

            var result = _validator.TestValidate(bookClub);

            result.ShouldNotHaveValidationErrorFor(x => x.Name);
        }

        [Test]
        public void Validate_WithInvalidName_ShouldHaveValidationError()
        {
            var bookClub = new BookClub
            {
                Name = null,
            };

            var result = _validator.TestValidate(bookClub);

            result.ShouldHaveValidationErrorFor(x => x.Name);
        }
    }
}
