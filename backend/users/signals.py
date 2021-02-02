from django.dispatch import receiver
from django.urls import reverse
from django_rest_passwordreset.signals import reset_password_token_created
from django.core.mail import send_mail

@receiver(reset_password_token_created)
def password_reset_token_created(sender, instance, reset_password_token, *args, **kwargs):

    # email_plaintext_message = "{}?token={}".format(reverse('password_reset:reset-password-request'), reset_password_token.key)
    email_plaintext_message = "http://localhost:3000{}?token={}".format('/password_reset/', reset_password_token.key)
    print(email_plaintext_message)
    print("!" * 50)
    send_mail(
        # title:
        "Password Reset for {title}".format(title="HelloYou"),
        # message:
        email_plaintext_message,
        # from:
        "noreply@somehost.local",
        # to:
        [reset_password_token.user.email]
    )