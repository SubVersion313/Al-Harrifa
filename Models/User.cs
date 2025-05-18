using System;
using System.ComponentModel.DataAnnotations;

public class User
{
    public int Id { get; set; }
    [Required]
    public string NameUser { get; set; }
    [Required]
    [EmailAddress]
    public string Email { get; set; }
    [Required]
    public string PasswordUser { get; set; }
    public string Address { get; set; }
    public bool IsAdmin { get; set; }
    public DateTime CreatedAt { get; set; }
}