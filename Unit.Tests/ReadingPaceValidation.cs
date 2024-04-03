using NUnit.Framework;
using FluentValidation.TestHelper;
using Application.BookClubs;
using Domain;

namespace Unit.Tests
{
    [TestFixture]
    public class ReadingPaceValidation
    {
        private BookClubValidator _validator;

        [SetUp]
        public void Setup()
        {
            _validator = new BookClubValidator();
        }

        [Test]
        public void Validate_WithValidReadingPace_ShouldNotHaveValidationError()
        {
            var bookClub = new BookClub
            {
                ReadingPace = "Moderate",
            };

            var result = _validator.TestValidate(bookClub);

            result.ShouldNotHaveValidationErrorFor(x => x.ReadingPace);
        }

        [Test]
        public void Validate_WithInvalidReadingPace_ShouldHaveValidationError()
        {
            var bookClub = new BookClub
            {
                ReadingPace = null, 
            };

            var result = _validator.TestValidate(bookClub);

            result.ShouldHaveValidationErrorFor(x => x.ReadingPace);
        }
    }
}
