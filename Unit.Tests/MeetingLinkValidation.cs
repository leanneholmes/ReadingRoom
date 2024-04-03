using NUnit.Framework;
using FluentValidation.TestHelper;
using Application.BookClubs;
using Domain;

namespace Unit.Tests
{
    [TestFixture]
    public class MeetingLinkValidation
    {
        private BookClubValidator _validator;

        [SetUp]
        public void Setup()
        {
            _validator = new BookClubValidator();
        }

        [Test]
        public void Validate_WithValidMeetingLink_ShouldNotHaveValidationError()
        {
            var bookClub = new BookClub
            {
                MeetingLink = "http://example.com",
            };

            var result = _validator.TestValidate(bookClub);

            result.ShouldNotHaveValidationErrorFor(x => x.MeetingLink);
        }

        [Test]
        public void Validate_WithInvalidMeetingLink_ShouldHaveValidationError()
        {
            var bookClub = new BookClub
            {
                MeetingLink = null,
            };

            var result = _validator.TestValidate(bookClub);

            result.ShouldHaveValidationErrorFor(x => x.MeetingLink);
        }
    }
}
