using NUnit.Framework;
using FluentValidation.TestHelper;
using Application.BookClubs;
using Domain;
using System;

namespace Unit.Tests
{
    [TestFixture]
    public class NextMeetingValidation
    {
        private BookClubValidator _validator;

        [SetUp]
        public void Setup()
        {
            _validator = new BookClubValidator();
        }

        [Test]
        public void Validate_WithValidNextMeeting_ShouldNotHaveValidationError()
        {
            var bookClub = new BookClub
            {
                NextMeeting = DateTime.Now.AddDays(1),
            };

            var result = _validator.TestValidate(bookClub);

            result.ShouldNotHaveValidationErrorFor(x => x.NextMeeting);
        }

        [Test]
        public void Validate_WithInvalidNextMeeting_ShouldHaveValidationError()
        {
            var bookClub = new BookClub
            {
                NextMeeting = DateTime.MinValue,
            };

            var result = _validator.TestValidate(bookClub);

            result.ShouldHaveValidationErrorFor(x => x.NextMeeting);
        }
    }
}
