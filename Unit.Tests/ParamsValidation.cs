using NUnit.Framework;
using Application.BookClubs;

namespace Unit.Tests
{
    [TestFixture]
    public class ParamsValidation
    {
        [Test]
        public void BookClubParams_Has_IsMember_Property()
        {
            var paramsInstance = new BookClubParams();

            Assert.That(paramsInstance, Has.Property("IsMember"));
        }

        [Test]
        public void BookClubParams_Has_IsOwner_Property()
        {
            var paramsInstance = new BookClubParams();

            Assert.That(paramsInstance, Has.Property("IsOwner"));
        }

        [Test]
        public void BookClubParams_Has_Category_Property()
        {
            var paramsInstance = new BookClubParams();

            Assert.That(paramsInstance, Has.Property("Category"));
        }

        [Test]
        public void BookClubParams_Has_ReadingPace_Property()
        {
            var paramsInstance = new BookClubParams();

            Assert.That(paramsInstance, Has.Property("ReadingPace"));
        }
    }
}
