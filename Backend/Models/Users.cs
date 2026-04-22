using System.ComponentModel.DataAnnotations;

namespace LogIntelligence.Models

{
    public class User
    {
        public int Id { get; set; }


        [Required]
        [MinLength(4)]
        [MaxLength(20)]
        [RegularExpression(@"^[a-zA-Z0-9_]+$",ErrorMessage ="ONLY LETTERS,NUMBERS,UNDERSCORE ALLOWED")]
        public string Username { get; set; }

        [Required]
        [MinLength(6)]
        public string PasswordHash { get; set; }
        public string Role { get; set; }
    }
}
